import { useEffect, useState } from 'react';
import './App.css';
import Option from './components/Option';
import Header from './components/Header'
import { db } from './firebase'
import { auth } from './firebase';
import { arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

function App() {

  const [question, setQuestion] = useState()

  useEffect(() => {
    getTodaysQuestion()
  }, [])

  function getTodaysQuestion() {
    const docs = getDocs(collection(db, "would-you-rather"))
    docs.then(result => {
      const todaysQuestion = result.docs.filter(doc => doc.id === 'todays_question')[0]
      setQuestion(todaysQuestion.data())
   //   setQuestion(todaysQuestion.data().

    }) 
  }

  // votes for the specified option and increments count in database
  function vote(option) {
    getDocs(collection(db, 'would-you-rather'))
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
        const qotd = doc(db, 'would-you-rather', 'todays_question')
        updateDoc(qotd, data)    
        addToUserHistory(option)
      })
  }

  // retrieves the current user's uid 
  // fetches from local storage if stored in there, otherwise fetches from auth object 
  function getCurrentUserUid() {
    if(localStorage.getItem('uid')) {
      return localStorage.getItem('uid')
    } else if(auth.currentUser) {
      return auth.currentUser.uid 
    } else {
      return null
    }
  }

  function addToUserHistory(option) {
    const uid = getCurrentUserUid()
    const userDoc = doc(db, "users", uid)
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

  function checkIfUserVoted() {

  }

  return (
    <div className="App">
      <Header />
      <div className="options-container">
        <h1 className="header">Would You Rather...</h1>
        {question ? 
        <div>
          <Option option={question.firstOption.value} vote={() => vote(question.firstOption)} />
          <h2>OR</h2>
          <Option option={question.secondOption.value} vote={() => vote(question.secondOption)} />
        </div> 
          : null}
      </div>
    </div>
  );
}

export default App;
