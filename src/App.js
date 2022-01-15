import './App.css';
import { useRef, useState, useEffect } from 'react'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Canvas = props => {
  const canvasRef = useRef(null)
  const { width, height } = useWindowDimensions()
  const birthday = new Date(2003, 5, 10)
  const today = new Date()
  const milSecPerWeek = 7 * 24 * 3600000
  const weekLived = parseInt(( today.getTime() - birthday.getTime() ) / milSecPerWeek)
  
  const draw = ctx => {
    let h = canvasRef.current.clientHeight
    let offset = h*0.032
    let space = h*0.0095
    let radius = h*0.0025
    let fontSize = h*0.02
    for (let year=0;year<100;year++){
      for (let week=0;week<52;week++){
        ctx.beginPath()
        ctx.fillStyle = '#f7613b'
        ctx.strokeStyle = '#000000'
        ctx.arc(offset*1.5+space*week, offset+space*year, radius, 0, 2*Math.PI)
        if ( week+52*year < weekLived ) {
          ctx.fill()
        } else {
          ctx.stroke()
        }

      }
    }
    for (let decade=1;decade<11;decade++){
      ctx.font = fontSize + 'px Noto Serif Display';
      ctx.fillStyle = '#000000'
      ctx.fillText(decade*10+'', offset*1.5+52*space, offset-fontSize/4+space*decade*10);
    }
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    canvas.height = height * 0.95
    canvas.width = canvas.height * 0.58
    //Our draw come here
    draw(context)
  }, [draw]) 

  return <canvas ref={canvasRef} {...props}/>
}

function App() {
  return (
    <>
      <div className="main">
        <span className="title">Memento Mori</span>
        <Canvas className="canvas" />
      </div>
    </>
  );
}

export default App;
