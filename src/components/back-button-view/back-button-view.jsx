import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './back-button-view.scss';

export function BackButtonView(props) {
  return (
    <Button className="back-container btn btn-primary" onClick={props.cancel}>
      <div className="arrow"></div>Back
    </Button>
  );
}
