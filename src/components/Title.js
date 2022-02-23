import React, { useEffect, useState } from "react";

const getSize = (w) => {
  if (w <= 425) return 18
  else if (w <= 768) return 20
  else return 22
}

export default function Title({started, setTextFromTitle}) {
  const [fontSize, setFontSize] = useState()

  useEffect(() => {
    setFontSize(getSize(window.innerWidth))
  }, [])
  
  return (
    <div className="title">
      <div className="ascii">
        <pre> ________  ________  ________   ___  _______   ___               _____ ______          </pre>
        <pre>|\   ___ \|\   __  \|\   ___  \|\  \|\  ___ \ |\  \             |\   _ \  _   \        </pre>
        <pre>\ \  \_|\ \ \  \|\  \ \  \\ \  \ \  \ \   __/|\ \  \            \ \  \\\__\ \  \       </pre>
        <pre> \ \  \ \\ \ \   __  \ \  \\ \  \ \  \ \  \_|/_\ \  \            \ \  \\|__| \  \      </pre>
        <pre>  \ \  \_\\ \ \  \ \  \ \  \\ \  \ \  \ \  \_|\ \ \  \____        \ \  \    \ \  \ ___ </pre>
        <pre>   \ \_______\ \__\ \__\ \__\\ \__\ \__\ \_______\ \_______\       \ \__\    \ \__|\__\</pre>
        <pre>    \|_______|\|__|\|__|\|__| \|__|\|__|\|_______|\|_______|        \|__|     \|__\|__|</pre>
      </div>
      <p style={{
        fontSize: started ? 0 : fontSize,
        opacity: started ? 0 : 1,
        margin: started ? "0" : "15px 0"
      }}>
        Type or click <span onClick={() => setTextFromTitle("help")}>help</span> in the terminal to start
      </p>
    </div>
  );
}
