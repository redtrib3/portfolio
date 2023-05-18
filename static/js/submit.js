
function showNotification(message,state)
{
    notification = document.getElementById("notification");
    deleteCross = document.querySelector(".delete");
    notifContent = document.getElementById("notif-msg");
    
    notification.classList.remove("is-hidden");
    notification.classList.add("is-light");
    notification.classList.replace(notification.classList[1], state);
    
    notifContent.innerHTML = message;
    
    deleteCross.addEventListener('click', () => {
        notification.classList.add('is-hidden');
    });
    
    setTimeout(() => {
        notification.classList.add("is-hidden");
    }, 4000);
    
}

function submitflag(challengeId)
{
    
    let flagValue = document.getElementById(`flag-input-${challengeId}`);
    let thisbutton = document.getElementById(`flag-btn-${challengeId}`);
    
    thisbutton.classList.add("is-loading");
    
    const ids = {"1330":false,"1331":false,"1332":false,"1333":false, "1334":false};
    localStorage.setItem("ids",JSON.stringify(ids)); 
    
    let responseJson;
    
    if(flagValue.value != "")
    {        
        const formData = new FormData();
        formData.append("challenge_id",challengeId);
        formData.append("flag",flagValue.value);
        
        fetch("https://flagsubredtrib3-1-b5762800.deta.app/api/submit-flag/",
        {
            method:"POST",
            body:formData
        })
        .then((response) => response.json())
        .then(json => {
            
            responseJson = json;
            //  console.log(responseJson);

            if(responseJson.success === true && ids[responseJson.challenge_id] == true)
            {
                showNotification("Challenge already completed","is-warning");
                thisbutton.classList.remove("is-loading");
            

            }
            
            if (responseJson.success === true && ids[responseJson.challenge_id] == false)
            {
                ids[responseJson.challenge_id] = true;
                flagValue.setAttribute("disabled","");
                thisbutton.setAttribute("disabled","");  
                showNotification("Oo! You grabbed the right flag !","is-success");
                document.getElementById(`challenge-header-${challengeId}`).style.color = "#59ff59";
                thisbutton.classList.remove("is-loading");
            
            }
            

            if (responseJson.success === false)
            {
                showNotification("Thats an Incorrect Flag :(","is-danger");
                thisbutton.classList.remove("is-loading");
            
            }
            
            localStorage.setItem('ids', JSON.stringify(ids));
            thisbutton.classList.remove("is-loading");
            
        });     
        
    }
    
    else
    {
        showNotification("Flag field cannot be empty .","is-info");
        thisbutton.classList.remove("is-loading");
    }
    
    
}

function downloadFile(filename,challengeId)
{
    downloadbtn = document.getElementById(`download-${challengeId}`);
    downloadbtn.classList.add("is-loading")
    
    fetch(`https://flagsubredtrib3-1-b5762800.deta.app/download/${filename}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            downloadbtn.classList.remove("is-loading");   
        });
   
}
