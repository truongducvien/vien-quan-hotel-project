import ReactTextCollapse from "react-text-collapse/dist/ReactTextCollapse"


const TEXT_COLLAPSE_OPTIONS = {
   collapse: false,
   collapseText: '... show more',
   expandText: 'show less',
   minHeight: 70,
   maxHeight: 230,
   textStyle: {
      color: 'grey',
      fontSize: '13px',
   },
}

export default function TextCollapsed({text}){
   return(
      <div >
         <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
            {text}
         </ReactTextCollapse>
      </div>
   )
}