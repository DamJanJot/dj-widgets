import { ReactNode } from 'react'

export default function Card({title, children, className}:{title?:string, children:ReactNode, className?:string}){
  return (
    <div className={`card ${className??''}`}>
      {title && <h3>{title}</h3>}
      {children}


      
    </div>
  )
}




