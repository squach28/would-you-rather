import { useEffect, useState } from 'react';
import './App.css';
import Option from './components/Option';
import Header from './components/Header'
import { arrayUnion, collection, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore'
import { ClipLoader } from 'react-spinners';
import ResultChart from './components/ResultChart';
import giraffeImage from './assets/images/giraffe.png'

function App(props) {

  const [question, setQuestion] = useState()
  const [answered, setAnswered] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTodaysQuestion()
  })

  function getTodaysQuestion() {
    const docs = getDocs(collection(props.db, "would-you-rather"))
    docs.then(result => {
      const todaysQuestion = result.docs.filter(doc => doc.id === 'todays_question')[0]
      setQuestion(todaysQuestion.data())
     checkIfUserVoted(todaysQuestion.data().id)
    }) 
    .catch(err => {
      setLoading(false)
    })
  }

  // votes for the specified option and increments count in database
  function vote(option) {
    getDocs(collection(props.db, 'would-you-rather'))
      .then(result => {
        let data = {}
        const todaysQuestion = result.docs.filter(doc => doc.id === 'todays_question')[0]
        todaysQuestion.data().firstOption.value === option.value ? 
          data = {
            firstOption: {
              value: option.value, 
              count: todaysQuestion.data().firstOption.count + 1
            }
          } : 
          data = {
            secondOption: {
              value: option.value, 
              count: parseInt(todaysQuestion.data().secondOption.count) + 1
            }
          }
        const qotd = doc(props.db, 'would-you-rather', 'todays_question')
        updateDoc(qotd, data)    
        addToUserHistory(option)
      })
      .catch(error => console.error(error))
  }

  // retrieves the current user's uid 
  // fetches from local storage if stored in there, otherwise fetches from props.auth object 
  function getCurrentUserUid() {
    if(localStorage.getItem('uid')) {
      return localStorage.getItem('uid')
    } else if(props.auth.currentUser) {
      return props.auth.currentUser.uid 
    } else {
      return null
    }
  }

  // adds the question id and option that the user voted into user's history
  function addToUserHistory(option) {
    const uid = getCurrentUserUid()
    const userDoc = doc(props.db, 'users', uid)
    if(uid === null) {
      return 
    }

    const answeredQuestion = {
      id: question.id,
      votedFor: {
        value: option.value
      }
    }

    updateDoc(userDoc, {
      history: arrayUnion(answeredQuestion)
    })
  }

  // checks if the user voted by checking the user's history
  function checkIfUserVoted(questionId) {
    const uid = getCurrentUserUid()
    if(uid == null) {
      setLoading(false)
      return
    }
    const userDoc = doc(props.db, 'users', uid)
    getDoc(userDoc)
      .then(result => {
        const answered = result.data().history.filter(question => question.id === questionId).length > 0
        setAnswered(answered)
        setLoading(false)
      })
      .catch(err => {
          console.error(err)
          setLoading(false)
        })
  }

  return (
    <div className="App">
      <Header loading={loading} auth={props.auth}/>
      <div className="options-container">
        {
          !loading ? 
            props.auth.currentUser ? 
              !answered && question ? 
              <div>
                <h1 className="header">Would You Rather...</h1>
                <Option option={question.firstOption.value} vote={() => vote(question.firstOption)} />
                <h2>OR</h2>
                <Option option={question.secondOption.value} vote={() => vote(question.secondOption)} />
              </div> 
              : 
              <ResultChart 
                firstOptionValue={question.firstOption.value} 
                firstOptionCount={question.firstOption.count}
                secondOptionValue={question.secondOption.value}
                secondOptionCount={question.secondOption.count}
              />
              : <div className="sign-in-msg-container">
                  <p>Sign in to answer today's question and see the results!</p>
                  <img className="giraffe-image" src={giraffeImage} alt="giraffe with his mind blown" />
                </div>
              

          : <ClipLoader />
          
          }
      </div>
    </div>
  );
}

export default App;
