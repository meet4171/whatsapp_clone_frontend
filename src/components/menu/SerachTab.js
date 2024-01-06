import { Box, styled, InputBase } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const CustomContainer = styled(Box)`
    background-color: #f0f2f5;
    width: 80%;
    max-width: 410px;
    margin: 10px auto;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 5px;

    & > label {
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer; // Added cursor style
    }

    & > label:hover {
        cursor: pointer;
    }

    & > label > span {
        transition: transform 0.3s ease; // Added transition for rotation
    }

    & > label > * {
        margin-left: 5px;
    }
`;

const CustomInputBase = styled(InputBase)`
    width: 100%;
    padding: 0 3px;
`;

export default function SearchTab({ setSearchText }) {
    const [focus, setFocus] = useState(false);

    function handleFocus() {
        setFocus(!focus);
    }

    function handleBlur() {
        setFocus(false);
    }

    function handleCompositionStart() {
        setFocus(true);
    }

    function handleCompositionEnd() {
        setFocus(false);
    }

    function handleChange(e) {
        if (!e.target.value.trim()) {
            setFocus(false);
        }
        setSearchText(e.target.value);
    }

    const iconRotation = focus ? 'rotate(0deg)' : 'rotate(180deg)';

    return (
        <CustomContainer>
            <label>
                <span style={ { transform: iconRotation } } onClick={ handleFocus }>
                    { focus ? (
                        <KeyboardBackspaceIcon />
                    ) : (
                        <SearchIcon style={ { transform: 'rotate(270deg)' } } />
                    ) }
                </span>
                <CustomInputBase
                    placeholder="Search or start new chat"
                    autoFocus={ focus }
                    onBlur={ handleBlur }
                    onCompositionStart={ handleCompositionStart }
                    onCompositionEnd={ handleCompositionEnd }
                    onInput={ (e) => handleChange(e) }
                />
            </label>
        </CustomContainer>
    );
}
