import React,{useState,useEffect} from 'react'
import {db} from "../../firebase/index";
import TagsInput from 'react-tagsinput'
// import { ReactTagsInput } from "./types/tagsInput"
import 'react-tagsinput/react-tagsinput.css'
import Autosuggest from 'react-autosuggest'

type PROPS = {
  tags: string[];
  setTags:  React.Dispatch<React.SetStateAction<string[]>>;
}

const TagArea: React.FC<PROPS> = ({tags,setTags}) => {

  const [tagMenu,setTagMenu]=useState<string[]>([])
  useEffect(() => {
    db.collection("tags").get().then((snapshot) => {
     const tagList: string[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()

        const tag = data.tag
        console.log(tag)
        tagList.push(tag)
      })
      console.log(tagList)
      setTagMenu(tagList)
   })
  }, [])
const states =tagMenu
// @ts-ignore
  const autocompleteRenderInput = ({ addTag, ...props }) => {
      // @ts-ignore
      const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          props.onChange(e)
        }
      }

      const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
      const inputLength = inputValue.length
  console.log(states)
      let suggestions = states.filter((state) => {
        return state.toLowerCase().slice(0, inputLength) === inputValue
      })
    //  stateがオブジェクトではなく配列の時
      return (
        // @ts-ignore
        <Autosuggest
          ref={props.ref}
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <span>{suggestion}</span>}
           // @ts-ignore
          inputProps={{...props, onChange: handleOnChange,placeholder: "タグを入力してください"}}
          onSuggestionSelected={(e, {suggestion}) => {
            addTag(suggestion)
          }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      )
    }

   console.log(tags)
// @ts-ignore
  return <TagsInput renderInput={autocompleteRenderInput} value={tags} onChange={(tags: any) => setTags(tags)} maxTags="5" style={{width:"100%"}}/>

}

export default TagArea
