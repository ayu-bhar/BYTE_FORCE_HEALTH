import React,{useState} from "react";

const Dropdown = ()=>{
         
         const[isOpen,setisOpen] = useState(false)
         const handleMouseEnter = () => setisOpen(true);
         const handleMouseLeave = () => setisOpen(false);

         return(
              <div className="dropdown"
                onMouseEnter = {handleMouseEnter}
                onMouseLeave = {handleMouseLeave}
                style = {{position:"relative", display:"inline-block"}}>
              
              <lord-icon  className = "dropdown"
                            src="https://cdn.lordicon.com/nnzfcuqw.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#E5EBF3,secondary:#ee6d66">
                        </lord-icon>{
                             isOpen && (
                                <ul 
                                  className="dmenu"
                                  style={{
                                    position:"absolute",
                                    zIndex:1000,
                                    border:"2px solid grey",borderRadius:"10px",boxShadow:"2px 2px 2px grey"
                                  }}>
                                    <li style={{borderBottom: "2px solid grey" }}>+919259455951</li>
                                    <li>abc.hark@gmail.com</li>
                                    
                                  </ul>
                             )
                        }
              </div>
         )
}

export default Dropdown

