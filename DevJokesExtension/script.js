fetch('https://backend-omega-seven.vercel.app/api/getjoke')
    .then(data => data.json())
    .then(jokesData => {
        const jokesQuestion = jokesData[0].question;
        const jokesPunchline = jokesData[0].punchline;

        const jokesEleOne = document.getElementById('jokeQuestion');
        const jokesEleTwo = document.getElementById('jokePunchline');
        jokesEleOne.innerHTML = jokesQuestion;
        jokesEleTwo.innerHTML = jokesPunchline;
    })

    alarmSubmit.addEventListener('click', (e)=>{
        window.location.reload();
    })