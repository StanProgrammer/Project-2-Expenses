 const myform = document.getElementById('myform')
    const password = document.getElementById('password')
    const email = document.getElementById('email')

	myform.addEventListener('submit',async (e)=>{
		e.preventDefault()
		try{
		const user1=await axios.post('http://localhost:3000/check',{
                email:email.value,
                password:password.value
        })
		alert(user1.data.message)
		
		if(user1.status===200){
			
			window.location.href = "http://localhost:3000/home";
		}
	}
	catch(error){
		console.log(error.response.status);
		if(error.response.status===404){
			alert("User doesn't exists")
		}
		else if(error.response.status===401){
			alert("Wrong Password")
		}
		else(
			alert('Sorry problem is from our side')
		)
	}
	})