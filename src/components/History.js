import React, { useEffect, useState} from 'react'
import Header from './Header'
import { collection, doc, getDoc } from 'firebase/firestore'
import ResultChart from './ResultChart'

function History(props) {

  const [ history, setHistory ] = useState([])

  useEffect(() => {
    const uid = getCurrentUserUid()
    const pastQuestions = collection(props.db, 'would-you-rather', 'past_questions', 'past_questions')
    const userDoc = doc(props.db, 'users', uid)
    getDoc(userDoc)
      .then(result => {
        console.log(pastQuestions)
        const userHistory = result.data().history
        userHistory.forEach(userItem => {
          const question = getDoc(doc(props.db, `would-you-rather/past_questions/past_questions/${userItem.id}`))
          question.then(result => {
            setHistory(oldHistory => [...oldHistory, {...userItem, ...result.data()}])
            console.log(history)
          })
        })
        console.log(history)

      })
      .catch(err => {
          console.error(err)
        })
  }, [])

  function getCurrentUserUid() {
    if(localStorage.getItem('uid')) {
      return localStorage.getItem('uid')
    } else if(props.auth.currentUser) {
      return props.auth.currentUser.uid 
    } else {
      return null
    }
  }

  return (
    <div>
        <Header auth={props.auth}/>
          {history.length > 0 ? history.map(question => 
                <ResultChart 
                  key={question.id}
                  firstOptionCount ={question.firstOption.count} 
                  firstOptionValue={question.firstOption.value}
                  secondOptionCount={question.secondOption.count}
                  secondOptionValue={question.secondOption.value}
                  votedFor={question.votedFor.value}
                />
            ) : null
          }
    </div>
  )
}

export default History