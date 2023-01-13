// Entry point for the build script in your package.json

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "./channels"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dashboard from './components/dashboard.js'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

const container = document.querySelector('#reactContainer');
const jsonData = document.getElementById('json-data');
const data = JSON.parse(jsonData.getAttribute('data'));
const root = ReactDOM.createRoot(container);
root.render(<Dashboard customers={data.customers} payments={data.payments} />);
