const myForm=document.getElementById('myform')
const name=document.getElementById('name')
const email=document.getElementById('email')
const phone=document.getElementById('phone')
const password=document.getElementById('password')
const loginbtn=document.getElementById('loginbtn')

myForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const name=document.getElementById('name')
    const email=document.getElementById('email')
    const phone=document.getElementById('phone')
    const password=document.getElementById('password')
    e.preventDefault()
    try{
        const user1=await axios.post('http://localhost:3000/login',{
            name:name.value,
            email:email.value,
            phone:phone.value,
            password:password.value
        })
        const token = user1.data.token
		    const id = user1.data.userId
        // user1.setHeader("Authorization",token)
        // axios.setHeader('UserId',user1.id)
        localStorage.setItem('token',token);
        localStorage.setItem('id',id);
        alert(user1.data.message,'you can login now')
        window.location.href = "http://localhost:3000/loginPage";
    }catch(error){
          console.log(error);
          // if(confirm('User already exists')){
          //   window.location.reload()
          // }
          
    } 

})
loginbtn.addEventListener('click',async()=>{
  try{
    window.location.href = "http://localhost:3000/loginPage";
  }
  catch(err){
    console.log(err);
  }
})
//SETHEADERS IN SIGNUP FOR 