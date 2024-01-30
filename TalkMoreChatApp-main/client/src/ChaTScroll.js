import React from 'react';
const  ChaTScroll = ({message}) => {
  const idd = JSON.parse(localStorage.getItem("id"));

   const isSameSenderMargin = (message, m, i) => {
  if (
    i < message.length - 1 &&
    message[i + 1].sender._id === m.sender._id &&
    message[i].sender._id !== idd._id
  )
    return 33;
  else if (
    (i < message.length - 1 &&
      message[i + 1].sender._id !== m.sender._id &&
      message[i].sender._id !== idd._id) ||
    (i === message.length - 1 && message[i].sender._id !== idd._id)
  )
    return 0;
  else return "auto";
};

const isSameUser = ( message , m, i) => {
  return i > 0 && message[i - 1].sender._id === m.sender._id;
};


  return (
    <>
    {
    message && message?.map((m,i)=>(
        <div style={{display:"flex"}} >
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === idd._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(message , m , i ),
                marginTop:  isSameUser(message , m,i) ? 3:10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              
           <span>
             {m.sender._id !== idd._id ? (
              <>
               <span
             style={{textTransform:'uppercase',fontWeight:'600'}} 
             >{m.sender.name} : </span>
              {m.content}
              </>
             ):(
              <>
              {m.content}
              </>
             )}
            
            </span>
            </span>

        </div>
      ))
    }
    </>
  )
};
export default ChaTScroll;
