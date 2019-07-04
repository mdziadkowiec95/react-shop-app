import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'components/atoms/TextField/TextField';
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';

const StyledFieldGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAddBtn = styled.button`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.success};
  font-size: ${({ theme }) => theme.fontSize.xl}; 

  transition: opacity .2s, transform .2s;
  cursor: pointer;

  :hover {
    opacity: .7;
    transform: scale(1.1);
  }
`;

const StyledRemoveBtn = styled(StyledAddBtn)`
  position: absolute;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.danger};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledAlert = styled.p`
  color: red;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledTextField = styled(TextField)`
  margin: 0 10px;
`;

const StyledList = styled.ul`
  padding-left: 20px;
  margin-bottom: 20px;
  list-style: disc;
`;

const StyledListItem = styled.li`
  position: relative;
  margin-bottom: 10px;
`;



class ProductAddList extends Component {
  state = {
    label: '',
    value: '',
    showAlert: false,
  };

  handleFieldChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  addItem = (e) => {
    e.preventDefault();

    const { label, value } = this.state;
    const { listType } = this.props;


    if ((label !== '' && value !== '') || (value !== '' && listType === 'description')) {

      this.setState({
        showAlert: false
      }, this.props.addItemFn(listType, value, label));

      this.setState({
        label: '',
        value: ''
      });
    } else {
      this.setState({
        showAlert: true
      });
    }
  }


  render() {
    const { headingText, listType, items, removeItemFn } = this.props;
    const { label, value, showAlert } = this.state;

    if (listType !== 'description') {
      return (
        <div>
          <h3>{headingText}:</h3>
          <div>
            <StyledFieldGroup>
              <StyledTextField
                size="small"
                inputName="label"
                inputPlaceholder="Feature label"
                inputValue={label}
                onChangeFn={this.handleFieldChange}
              />
              <StyledTextField
                size="small"
                inputName="value"
                inputPlaceholder="Feature description"
                inputValue={value}
                onChangeFn={this.handleFieldChange}
              />
              <StyledAddBtn onClick={this.addItem}>
                <MdAddCircle />
              </StyledAddBtn>
            </StyledFieldGroup>

            {showAlert &&
              <StyledAlert>You need to provide both Label and Value text!</StyledAlert>}
          </div>

          <StyledList>
            {items && items.map((item, index) => {


              return (
                <StyledListItem key={item.key}>
                  <p><strong>{item.label}:</strong> {item.value}</p>
                  <StyledRemoveBtn onClick={(e) => removeItemFn(e, listType, item.key)}>
                    <MdRemoveCircle />
                  </StyledRemoveBtn>
                </StyledListItem>
              )
            })}
          </StyledList>
        </div>
      )
    } else {
      return (
        <div>
          <h3>{headingText}:</h3>

          <div>
            <textarea onChange={this.handleFieldChange} name="value" rows="5" value={value}></textarea>
            <button onClick={this.addItem}>Add paragraph</button>
            <ul>
              {items && items.map(item => (
                <li key={item.key} >
                  <p>{item.value}</p>
                  <button onClick={(e) => removeItemFn(e, listType, item.key)} >Remove paragraph</button>
                </li>
              ))}

            </ul>
          </div>
        </div>
      )
    }
  }
};

export default ProductAddList;