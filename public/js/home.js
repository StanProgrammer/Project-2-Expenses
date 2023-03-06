let form = document.querySelector("#my-form");
let amount = document.querySelector('#amount');
let description = document.querySelector('#description');
let category = document.querySelector('#category');
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
        expense = {
            amount: amount.value,
            description: description.value,
            category: category.value
        }

        amount = amount.value,
            description = description.value,
            category = category.value

        const post = await axios.post('http://localhost:3000/home/expense', {
            amount: amount,
            description: description,
            category: category
        })
        
        window.location.reload()
        document.querySelector("#my-form").reset();
    } catch {
        alert('Cannot Submit data please check backend')
        console.log(err)
        
    }
})
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get('http://localhost:3000/home/show')
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
                var e = document.getElementById(li.id)
                var ul = e.parentElement
                const delte1 = await axios.get('http://localhost:3000/home/delete', { params: { id: res.id } })
                ul.removeChild(e)
                let b = JSON.parse(localStorage.getItem("amount"))
                document.getElementById('amount').value = res.amount
                document.getElementById('description').value = res.description
                document.getElementById('category').value = res.category
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
            const delte1 = await axios.get('http://localhost:3000/home/delete', { params: { id: id } })
            ul.removeChild(e)
        };
    } catch (err) {
        console.log(err);
    }
};