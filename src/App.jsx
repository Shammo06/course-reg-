import './App.css'
import Courses from './component/courses'
import {useEffect} from "react";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [courses, setCourses]= useState([])
  const [remain, setRemain] = useState(20);
  const [count, setCount] = useState(0);
  const [course, setCourse] = useState([]);
  const [sum, setSum] = useState(0);
      useEffect(()=>{
      fetch("course.json")
      .then(res => res.json())
      .then(data => setCourses(data))

  })
  const addinfo = (name,price,credit) =>{
    if ((remain - credit) > -1 && !course.includes(name)){
      if ((remain-credit)>-1){
        setRemain(remain-credit)
        setCount(count+credit)
      }  
        
      setSum(sum+price)
      if (!course.includes(name)){
        const newcourse=[...course,name]
        setCourse(newcourse)
      }
    }
    else{
      if (course.includes(name)){
        toast.error("Course already added", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,        
        })
      }
      else{
        toast.error("Course limit exists", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,        
        })
      }
    }
  }
  return (
    <>
      <h1 className='title'>Course Registration</h1>
      <div className='container'>
        <div className='course-card'>
        {
        courses.map(courses=><Courses key={courses.name} addinfo={addinfo} courses={courses}></Courses>)
        }
        </div>
        
        <div className='reg-info'>
          <h3 className='course-rem'>Credit Hour Remaining {remain} hr</h3>
          <hr></hr>
          <p>
            <h2>Course Name</h2>
            <ol>
              {course.map(course=><li key={course}>{course}</li>)}
            </ol>
          </p>
          <hr></hr>
          <h4>Total Credit Hour : {count}</h4>
          <hr></hr>
          <h4>Total Price : {sum} USD</h4>
        </div>
        <ToastContainer/>
        
      </div>
   
    </>
  )
}


export default App
