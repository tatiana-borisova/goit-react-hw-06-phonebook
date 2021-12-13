import React from 'react';
import { connect } from 'react-redux';
import Contact from '../Contact';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ contacts }) => (
  <div className={s.contacts}>
    <ul>
      {contacts.map(contact => (
        <li key={contact.id} className={s.contact}>
          <Contact data={contact} />
        </li>
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

const getVisibleContacts = (allItems, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allItems.filter(
    item =>
      item.name.toLowerCase().includes(normalizedFilter) ||
      item.number.includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});

export default connect(mapStateToProps)(ContactList);
