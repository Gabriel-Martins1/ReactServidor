import { useState, useEffect } from "react";
 
export default function Contador() { 
    const [count, setCount] = useState(0); 

 useEffect(() => {
 document.title = "contador apareceu na tela!" + count
 }, [count])

    return (
        <div>
            <p>Contador: {count}</p> 
            <button onClick={() => setCount(count + 1)} >Somar</button> 
        </div>
    );
}

