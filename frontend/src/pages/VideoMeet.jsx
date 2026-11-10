import React, { useEffect, useState , useRef } from 'react';
import "../styles/VideoComponent.css";
import { TextField, Button } from '@mui/material';
import io from "socket.io-client";


const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
    "iceServer" :[
        {"urls" :"stun:stun.l.google.com:19302"}
    ]
};

export default function VideoMeetComponent() {


    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef = useRef();

    let[videoAvailable , setVideoAvaible] = useState(true);

    let [audioAvailable , setAudioAvailable ] = useState(true);

    let [video , setVideo] = useState([]);

    let[audio , setAudio] = useState();

    let[screen , setScreen] = useState();

    let [showModel , setShowModel] =  useState();

    let [screenAvailable , setScreenAvailable] =useState();

    let [messages ,setMessages] = useState([]);

    let [message , setMessage] = useState("");

    let[newMessages , setNewMessages] = useState(0);

    let[askForUsername , setAskForUsername] = useState(true);

    let[username , setUsername] = useState("");

    const videoRef = useRef([]);

    let[videos  , setVideos] = useState([]);

    // if(isChorme() === false){

    // }

    const getPermissions = async ()=>{
      try{
        const videoPermission  = await navigator.mediaDevices.getUserMedia({video:true})
      
        if(videoPermission){
          setVideoAvaible(true);
        }else{
          setVideoAvaible(false);
        }

        const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true});

        if(audioPermission){
          setAudioAvailable(true);
        }else{
          setAudioAvailable(false);
        }

        if(navigator.mediaDevices.getDisplayMedia){
          setScreenAvailable(true);
        }else{
          setScreenAvailable(false);
        }

        if(videoAvailable || audioAvailable){
          const userMediaStream  = await navigator.mediaDevices.getUserMedia({video: videoAvailable , audio:audioAvailable});
           if(userMediaStream){
            window.localStream = userMediaStream;
            if(localVideoRef.current){
              localVideoRef.current.srcObject = userMediaStream;
            }
           }
        }
      }catch (err){
        console.log(err);
      }
    }
    useEffect(()=>{
        getPermissions();
    } , []);

    let getUserMediaSuccess = (stream)=>{

    }

    let getUserMedia = ()=>{
      if(video && videoAvailable || audio && audioAvailable){
        navigator.mediaDevices.getUserMedia({video:video , audio:audio})
        .then(()=>{}) //TODO getUserMEdiaSucess
        .then((stream)=>{})
        .catch((e)=>{console.log(e)});
      }else{
        try{
          let track = localVidoeRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop())
        }catch (e){
          throw e;
        }
      }
    }

    useEffect(()=>{
      if(video !== undefined && audio !== undefined){
        getUserMedia();
      }
    },[audio , video]);

    //TODO
    let gotMessageFromServer = (fromId , message)=>{

    }

    //TODO
    let addMessage=()=>{

    }

    let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url , {secure : false});

    socketRef.current.on("signal",gotMessageFromServer) ;

    socketRef.current.on("connect" , ()=>{
      socketRef.current.emit("join-call" , window.location.href)
      socketIdRef.current = socketRef.current.id;
      socketRef.current.on("chat-message" , addMessage)
      socketRef.current.on("user-left", (id)=>{
        setVideo((videos)=>video.filter((video)=>video.socketID !== id))
      })

      socketRef.current.on("user-joined" , (id, clients)=>{
        clients.forEach((socketListId)=>{

          connections[socketListId] = new RTCPeerConnection(peerConfigConnections)

          connections[socketListId].onicecandidate = (event)=>{
            if(evevt.candidate != null){
              socketRef.current.emit("signal", socketListId , JSON.stringify({'ice': event.candidate}))
            }
          }

          connections[socketListId].onaddstream = (event)=>{
           let videoExists = videoRef.current.find(video=> video.socketID === socketListId);

           if(videoExists){
            setVideo(video =>{
              const updatedVideos = video.map(video => 
                video.socketID === socketListId ? {...video , stream: event.stream} :video
              );
              videoRef.current = updatedVideos;
              return updatedVideos
            })
           }else{

            let newVideo = {
              socketID:socketListId,
              stream :event.stream,
              autoPlay : true,
              playsinline:true
            }
            setVideo(videos =>{
              const updatedVideos = [...videos , newVideo];
              videoRef.current = updatedVideos;
              return updatedVideos;
            })
           }
            

          };

          if(window.localStream !== undefined && window.localStream !== null){
            connections[socketListId].addStream(window.localStream);
          }else{
            //TODO
            // let blackSlience
          }

        })

        if(id === socketIdRef.current){
          for(let id2 in connections){
            if(id2 === socketIdRef.current) continue

            try{
              connections[id2].addStream(window.localStream)
            }catch (e){
              console.log(e);
            }

            connections[id2].createOffer().then((description)=>{
              connections[id2].setLocalDescription(description)
              .then(()=>{
                socketRef.current.emit("signal" , id2 , JSON.stringify({"sdp": connections[id2].localDescription}))
              })
              .catch(e => console.log(e));
            })
          }
        }
      
      })
    })
};

    let getMedia = ()=>{
      setVideo(videoAvailable);
      setAudio(audioAvailable);
      
      connectToSocketServer();
    }

    let connect = ()=>{
      setAskForUsername(false);
      getMedia();
    }
  return (
    <div>
      {askForUsername === true ?
      <div>
        <h2>Enter Into Lobby</h2>
        <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
          <Button variant="contained" onClick={connect}>Connect</Button>


          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>

        </div>:<></>
    }
    </div>
  )
}
