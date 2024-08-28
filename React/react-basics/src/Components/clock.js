
export default function clock({color,time}){
     return (
         <>
             {console.log(time)}
              <h3 style={{color:color}}> Time now is : {time.toLocaleTimeString()} </h3>
         </>
     )
}