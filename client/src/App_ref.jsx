import React, { useEffect } from 'react'
import axios from 'axios'
import beep from './resource/emergency.mp3'

export default function App_ref() {

const options = {
  method: 'POST',
  url: 'https://nexmo-nexmo-sms-verify-v1.p.rapidapi.com/send-verification-code',
  params: {phoneNumber: '6382944040', brand: 'hello'},
  headers: {
    'X-RapidAPI-Key': '57d794d7dbmsh45be660bbb70a20p1e644bjsn315683e9438c',
    'X-RapidAPI-Host': 'nexmo-nexmo-sms-verify-v1.p.rapidapi.com'
  }
};

const msg = () => {
    axios.post('https://nexmo-nexmo-sms-verify-v1.p.rapidapi.com/send-verification-code',{phoneNumber: '916382944040', brand: 'This i a message from the client'},{
    // axios.post('https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code',{params: {phoneNumber: '916382944040', verifyCode: '6655'}},{
        headers: {
            'X-RapidAPI-Key': '57d794d7dbmsh45be660bbb70a20p1e644bjsn315683e9438c',
            'X-RapidAPI-Host': 'nexmo-nexmo-sms-verify-v1.p.rapidapi.com'
          }
    },).then(response => {
        console.log('works', response)
    }).catch(err => {console.log('err', err)})
}

useEffect(() => {
    msg()
        
})

  const audio = new Audio(beep)
audio.load()
  const play = () => {
    audio.play()
  }
  const pause = () => {
    audio.pause()
  }

  return (
    <div>

      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
    </div>
  )
}
