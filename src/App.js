import { useEffect, useState } from 'react';
import './App.css';
import Option from './components/Option';
import Header from './components/Header'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

function App() {

  const [question, setQuestion] = useState()

  useEffect(() => {
    getTodaysQuestion()
  }, [])

  async function getTodaysQuestion() {
    const docs = getDocs(collection(db, "would-you-rather"))
    docs.then(result => {
      const todaysQuestion = result.docs.filter(doc => doc.id === 'todays_question')[0]
      setQuestion(todaysQuestion.data())
   //   setQuestion(todaysQuestion.data().

    }) 
  }
  return (
    <div className="App">
      <Header />

      <div className="options-container">
        <h1 className="header">Would You Rather...</h1>
        {question ? 
        <div>
          <Option option={question.firstOption.value} />
          <h2>OR</h2>
          <Option option={question.secondOption.value} />
        </div> 
          : null}
      </div>
    </div>
  );
}

export default App;
