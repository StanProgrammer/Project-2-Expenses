let form = document.querySelector("#my-form");
let amount = document.querySelector('#amount');
let description = document.querySelector('#description');
let category = document.querySelector('#category');
const token = localStorage.getItem('token');
expense = {
    amount: amount.value,
    description: description.value,
    category: category.value
}
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        let amount = document.querySelector('#amount');
        let category = document.querySelector('#category');
        let description = document.querySelector('#description');
        let expense = {
            amount: amount.value,
            description: description.value,
            category: category.value
        }
        const token = localStorage.getItem('token')
       
        const post = await axios.post('http://localhost:3000/home/expense', expense, { headers: {'Authorization': token}})
        
        window.location.reload()
        document.querySelector("#my-form").reset();
    } catch(error) {
        console.log(error);    
    }
})
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const decodeToken = parseJwt(token);
        const isAdmin = decodeToken.isPremiumUser;
        if(isAdmin){
            document.getElementById('premium').setAttribute('hidden','hidden');
            document.getElementById('leaderboard-btn').removeAttribute('hidden');
            document.getElementById('if-premium').innerHTML = '<p>You are now a Premium User</p>' + document.getElementById('if-premium').innerHTML;
        }
        const res = await axios.get('http://localhost:3000/home/show',{ headers: {'Authorization': token}
        })
        res.data.forEach((element) => {
            addExpence(element)
        })
    }
    catch (err) {
        alert('Error occured please check')
        console.log(err)
        throw new Error()
    }
})
async function addExpence(res) {
    try {
        let ul = document.getElementById("items");
        let li = document.createElement('li')
        let btn = document.createElement('button')
        li.className = 'card mt-3'
        btn.className = 'form-control bg-danger'
        li.id = res.id
        btn.value = 'delete'
        btn.onclick = () => {
            delete11(res.id)
        }
        btn.appendChild(document.createTextNode(`Delete`))
        let ebtn = document.createElement('button')
        ebtn.className = 'form-control bg-info'
        ebtn.value = 'edit'
        ebtn.appendChild(document.createTextNode(`Edit`))
        ebtn.onclick = async () => {
            try {
                await axios.post(`http://localhost:3000/home/edit-expense/${res.id}`,res, { headers: {'Authorization': token} })
                
                .then((response) => {
                    window.location.reload()
                    document.getElementById('amount').value = res.amount
                    document.getElementById('description').value = res.description
                    document.getElementById('category').value = res.category
                    // const parRes = JSON.parse(response.config.data);
                    // addNewLineElement(parRes);
                }).catch((err) => {
                    document.body.innerHTML+= '<h6> Submit failed try again</h6>'
                    console.log(err);      
                });
                var e = document.getElementById(li.id)
                var ul = e.parentElement
                const delte1 = await axios.get(`http://localhost:3000/home/delete/${res.id}`,{ headers: {'Authorization': token} })
                ul.removeChild(e)
                let b = JSON.parse(localStorage.getItem("amount"))
                
            } catch (err) {
                console.log(err);
            }
        }
        li.innerHTML = `<table class="table">
                        <tbody>
                        <tr>
                            <th scope="row">Price</th>
                            <td>${res.amount}</td>
                        </tr>
                        <tr>
                            <th scope="row">Product Name</th>
                            <td>${res.description}</td>
                        </tr>
                        <tr>
                            <th scope="row">Category</th>
                            <td>${res.category}</td>
                        </tr>
                        </tbody>
                    </table>`
        li.appendChild(btn)
        li.appendChild(ebtn)
        ul.appendChild(li)

    }
    catch (err) {
        alert('Error occured')
        console.log(err)
        throw new Error()
    }
}
async function delete11(id) {
    try {
        if (confirm('Are you sure?')) {
            var e = document.getElementById(id)
            var ul = e.parentElement
            const delte1 = await axios.get(`http://localhost:3000/home/delete/${id}`,  { headers: {'Authorization': token} })
            ul.removeChild(e)
        };
    } catch (err) {
        console.log(err);
    }
};
document.getElementById('premium').onclick = async function (e) {
    const response  = await axios.get('http://localhost:3000/purchase/premium-membership',  { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id,
     "order_id": response.data.order.id,
     "handler": async function (response) {
        const result = await axios.post("http://localhost:3000/purchase/update-transaction-status", {
            order_id: options.order_id, payment_id: response.razorpay_payment_id
        }, { headers: { "authorization": token } })
        alert("You are now a premium user")
        localStorage.setItem('token',result.data.token);
        document.getElementById('premium').setAttribute('hidden','hidden');
        document.getElementById('leaderboard-btn').removeAttribute('hidden');
        document.getElementById('if-premium').innerHTML='<h4>You are now a Premium User</h4>';
        }
    }

    const rzrp1 = new Razorpay(options);
    rzrp1.open();
    e.preventDefault();

    rzrp1.on("payment.failed", () => {
        axios.post("http://localhost:3000/purchase/update-transaction-status", { order_id: response.data.order.id }, { headers: { "authorization": token } })
        alert("something went wrong");
        rzrp1.close()
    })
}
let leaderboardDisplayed = false;
let leaderboardElements = [];
let leaderboardList = document.getElementById('leaderboard-list');
let leaderboardBtn = document.getElementById('leaderboard-btn');

axios.get("http://localhost:3000/premium/show-leaderboard", { headers: { "authorization": token } })
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            const li = document.createElement("li");
            li.id = "leaderboard-li"
            li.appendChild(document.createTextNode(` Name : ${res.data[i].name} ,`));
            li.appendChild(document.createTextNode(`Total Expense : ${res.data[i].totalExpense || 0}`));
            leaderboardElements.push(li);
        }
    })
    .catch(err => {
        console.log(err)
    })

leaderboardBtn.onclick = (e) => {
    e.preventDefault();
    document.getElementById('leaderboard-tracker').removeAttribute('hidden');

    if (leaderboardDisplayed) {
        leaderboardBtn.innerHTML = 'Show Leaderboard';
        leaderboardList.style.display = 'none';
        leaderboardDisplayed = false;
    } else {
        leaderboardBtn.innerHTML = 'Hide Leaderboard';
        leaderboardList.style.display = 'block';
        leaderboardElements.forEach(element => {
            leaderboardList.append(element)
        });
        leaderboardDisplayed = true;
    }
}
