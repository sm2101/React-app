import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const textFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) =>{
    return (
        <div className = "form-group m-2">
        {label && <label htmlFor = {name} className = "form-label">{name}:</label>}
        <input 
        className={classnames("form-control form-control-lg me-2",{
            'is-invalid':error
        })}
        type={type} 
        value = {value} 
        onChange = {onChange} 
        placeholder={placeholder} 
        name = {name}
        disabled = {disabled} 
        />
        {info && <small className = 'form-texttext-muted'>{info}</small>}
        {error && (
            <div className = "invalid-feedback">{error}</div>
        )}
        </div>
    )
};
textFieldGroup.propTypes = {
    name : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value : PropTypes.string.isRequired,
    info : PropTypes.string,
    error : PropTypes.string,
    type : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    disabled : PropTypes.string
}
textFieldGroup.defaultProps = {
    type :'text',
    
}
export default textFieldGroup;