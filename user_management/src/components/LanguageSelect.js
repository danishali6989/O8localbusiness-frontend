import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Popover } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';






export const LanguageSelect = ({ onLanguageClick }) => {
  // const langListNew = useSelector((state) => state.languageReducer.language);
  const langList = useSelector((state) => state.languageReducer.fieldgetall);
  const userLanguage = useSelector((state) => state.userReducer.userDetail);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const langField = useSelector((state) => state.languageReducer.fieldlanguage);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeHandler = ({ item }) => {
    handleClose();
    onLanguageClick({ item });
  };

  const renderField = (value) => {
    let screenName = value;
    if (langField) {
      let filterField = langField.filter(i => i.field === value);
      if (filterField.length > 0) {
        console.log({ filterField })
        screenName = filterField[0].description;
      };
    };
    return screenName;
  };

  return (
    <>
      <Button aria-describedby={id}
        variant="contained" color="primary"
        onClick={handleClick}
        style={{ fontSize: 12 }}>
        {renderField('LANGUAGE')}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <List style={{ width: 200 }}>

          {langList !== undefined && langList !== null && Object.keys(langList).length !== 0 && langList.map((item, index) => {
            let check = (userLanguage?.langId !== null) ? (item.lang_id === userLanguage?.langId) ? true : false : false;
            return (<ListItem button key={index}>
              <ListItemText onClick={changeHandler.bind(this, { item })}
                style={{ color: check ? 'blue' : null }}
                primary={renderField(item.lang_name)} />
            </ListItem>)
          })}
        </List>
      </Popover>
    </>
  )
}