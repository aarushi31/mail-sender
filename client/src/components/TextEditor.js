import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState,convertToRaw } from "draft-js"
import "../App.css"


function TextEditor() {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    const onEditorStateChange=(editorState)=>{
        
        let data=editorState.getCurrentContent();
        const data2=convertToRaw(data);
        console.log(data2)
        setEditorState(editorState)
    }

    
    return (
        <div className="editor">
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

export default TextEditor
