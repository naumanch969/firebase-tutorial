import { Link, useNavigate } from "react-router-dom"
import { Navbar } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { register } from "../redux/actions/user"
import { useEffect, useState } from "react"

const Register = () => {

    ///////////////////////////////////////  Variables  /////////////////////////////////////////////
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '', image: '' })
    const [file, setFile] = useState(null)
    const [percentage, setPercentage] = useState(null)
    const { error } = useSelector(state => state.user)
    const navigate = useNavigate()

    ///////////////////////////////////////  States   /////////////////////////////////////////////

    ///////////////////////////////////////  useEffect   /////////////////////////////////////////////
    useEffect(() => {
        const handleUpload = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, name)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
                    setPercentage(progress)
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUserData(pre => ({ ...pre, image: downloadURL }))
                    })
                }
            )
        }
        file && handleUpload()
    }, [file])

    ///////////////////////////////////////  Functions  /////////////////////////////////////////////
    // 1)
    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(register(userData, navigate))
    }
    // 2)
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Navbar />
            <div style={{ height: 'calc(100vh - 60px' }} className="w-full h-screen min-h-[30rem] bg-light-teal pt-[3rem] flex justify-center items-start relative">
                <div className="wrapper flex flex-col gap-[1rem] p-[20px] md:w-[60%] sm:w-[70%] w-[90%] bg-white " >
                    <h2 className="title capitalize text-[24px] font-light " >Create An Account</h2>
                    <form className="form flex flex-wrap md:flex-row flex-col gap-[1rem] " >
                        <input onChange={e => setFile(e.target.files[0])} name='image' type="file" className="" />
                        <input onChange={handleChange} name='name' type="text" placeholder="name" className="input outline-teal flex-1 min-w-[40%] border-[1px] rounded-[4px] border-light-gray500 p-[10px] " />
                        <input onChange={handleChange} name='username' type="text" placeholder="username" className="input outline-teal flex-1 min-w-[40%] border-[1px] rounded-[4px] border-light-gray500 p-[10px] " />
                        <input onChange={handleChange} name='email' type="email" placeholder="email" className="input outline-teal flex-1 min-w-full border-[1px] rounded-[4px] border-light-gray500 p-[10px] " />
                        <input onChange={handleChange} name='password' type="password" placeholder="password" className="input outline-teal flex-1 min-w-[40%] border-[1px] rounded-[4px] border-light-gray500 p-[10px] " />
                        <input onChange={handleChange} name='confirmPassword' type="password" placeholder="confirm password" className="input outline-teal flex-1 min-w-[40%] border-[1px] rounded-[4px] border-light-gray500 p-[10px] " />
                        <span className="aggreement text-[14px] " >By creating an account, I consent to the processing of my personal data in accordance with the <b className="" >PRIVACY POLICY</b></span>
                        <div className="flex justify-end w-full " >
                            <button disabled={percentage !== null && percentage < 100} onClick={handleRegister} className="w-[40%] border-none py-[16px] px-[20px] bg-teal text-white rounded-[2px] cursor-pointer " >Create</button>
                        </div>
                        {error && <p className='text-red-500 ' >something went wrong</p>}
                    </form>
                    <p className='w-full text-center capitalize ' >Already have account? <Link to='/login' className='text-teal' >login here</Link> </p>
                </div>
            </div>
        </>
    )
}

export default Register;