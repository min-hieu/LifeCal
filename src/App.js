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
    ctx.fillStyle = '#f7613b'
    ctx.strokeStyle = '#ffffff'
    let h = canvasRef.current.clientHeight
    let offset = h*0.02
    let hspace = h*0.01
    let vspace = h*0.01
    for (let year=0;year<100;year++){
      for (let week=0;week<52;week++){
        ctx.beginPath()
        ctx.arc(offset+vspace*week, offset+hspace*year, 3, 0, 2*Math.PI)
        if ( week+52*year < weekLived ) {
          ctx.fill()
        } else {
          ctx.stroke()
        }
      }
    }
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    canvas.height = height * 0.95
    canvas.width = canvas.height * 0.55
    //Our draw come here
    draw(context)
  }, [draw]) 

  return <canvas ref={canvasRef} {...props}/>
}

function App() {
  return (
    <>
      <div className="main">
        <span className="title">Memento M💀ri</span>
        <Canvas className="canvas" />
      </div>
    </>
  );
}

export default App;
