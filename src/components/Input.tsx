const Input = ({id,labelText,value,onChangeHandler}) => {
 return (
 <> 
    <label htmlFor={id} className="form-label">{labelText}</label>
    <input className="w-20 text-sky-600" id={id} type="text" value={value} onChange={onChangeHandler} />
 </>
 )
}

export default Input
