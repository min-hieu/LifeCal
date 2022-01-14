import './App.css';
import { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const canvasRef = useRef(null)
  const birthday = new Date(2003, 5, 10)
  const today = new Date()
  const milSecPerWeek = 7 * 24 * 3600000
  const weekLived = parseInt(( today.getTime() - birthday.getTime() ) / milSecPerWeek)
  
  const draw = ctx => {
    ctx.fillStyle = '#f7613b'
    ctx.strokeStyle = '#000000'
    for (let year=0;year<100;year++){
      for (let week=0;week<52;week++){
        ctx.beginPath()
        ctx.arc(15+9*week, 14.6+8.6*year, 3, 0, 2*Math.PI)
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
    
    canvas.height = window.innerHeight * 0.95
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
