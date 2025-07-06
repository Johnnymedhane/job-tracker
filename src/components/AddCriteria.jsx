// src/components/CriteriaList.jsx
import { useEffect, useRef, useState } from "react";
import Button from "./Button";



function AddCriteria({criteriaType, callFunction}) {
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();

        const handleKeyDown = (event) => {
            if(!inputRef.current.value) 
                return;
            
            if (event.key === "Enter") {
                event.preventDefault();
                const value = inputRef.current.value.trim();
                if (!value) return;

                if (
                    criteriaType.flat().some(
                      (item) => item.criteria.toLowerCase() === value.toLowerCase()
                    )
                  ) {
                    alert("This criterion already exists.");
                    return;
                  }

                  callFunction(value);
                  setInput("");
                  setTimeout(() => inputRef.current?.focus(), 0); // ensure focus AFTER render
                } else if (event.key === "Escape") {
                  setInput("");
                  inputRef.current.blur();
                }
              };
          
        // Add event listener for keydown
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [criteriaType, callFunction]);

    const handleAdd = () => {
        if (!input) {
            return;
        }
        if (criteriaType.flat().some(item => item.criteria.toLowerCase() === input.trim().toLowerCase())) {
            alert("This criterion already exists.");
            return;
        }
        callFunction(input.trim());
        setInput("");
        inputRef.current.focus(); // Focus back on the input field after adding
    }


    return (
       
           
           <div className="criteria-input">
           <input ref={inputRef}
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Add a your own criterion"
           />
            <button onClick={handleAdd}>
                Add Criterion
            </button>
            </div>
       
    )
}

export default AddCriteria;
