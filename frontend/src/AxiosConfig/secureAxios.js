import axios from 'axios'
const secureAxios=axios.create({baseURL:'https://backend-blog-appp.herokuapp.com/'})


secureAxios.interceptors.request.use(
    config=>{
        config.headers['Authorization']=`Bearer ${localStorage.getItem('token')}`
        config.headers['Content-Type']='application/json'
        return config
    })


secureAxios.interceptors.response.use(response=>{
        console.log(" got sucess from server")
        return response
    }, error=>{
        console.log("server crashed here!")
        return Promise.reject(error)
    })

export  default secureAxios