## Contact Us Form

- A name input field that accepts a string value.
- An email input field that accepts a string value.
- A message textarea field that accepts a string value.
- A submit button that sends the form data to the backend.

## Feedbacks on above input fields

- The name input field should not be empty.
- The email input field should not be empty.
- The email input field should be a valid email.
- The message textarea field should not be empty.
- The message textarea field should be at least 20 characters long.
- The submit button should be disabled if any of the inputs are invalid.
- The submit button should be disabled if the form is submitting.
- The submit button should be disabled if the form is submitted successfully.

## Third Party Libraries Used

- **Font Awesome** - For icons
- **Swiper** - For carousel
- **Validator** - For form validation

## Validators for inputs

- _isEmpty(str)_ - Check if field under validation is empty.

  - This validator will be triggered when user focus out of the empty input field.
  - if **false** then on focus out, the border color of input should be _Neutrals/400_.
  - if **true** then on focus out, the label color, the border color of input should be _#EA2A2A_ and the feedback should be shown, as followed, _"Field should not be empty!"_, with the same color. Add a keyup event to keep it true until the user enters a valid input. Also keep the button disabled.

- _isAlpha(str)_ - The name field under validation must be entirely alphabetic characters.

  - if **false** then on key up, the label color, the border color of input should be _#EA2A2A_ and show feedback, as followed - _"Name should be alphabetic characters only!"_, with the same color. While typing keep it false until the user enters a valid name. Also keep the button disabled.
  - if **true** then on focus out the border color of input should be _Neutrals/400_.

- _isEmail(str)_ - The email field under validation must be a valid email.

  - if **false** then on focus out, the label color, the border color of input should be _#EA2A2A_ and show feedback, as followed - _"Email should be a valid email address!"_, with the same color. Also keep the button disabled.
  - if **true** then on focus out the border color of input should be _Neutrals/400_.

- _isLength(str, {min: 20})_ - The message field under validation must be at least 20 characters long.
  - if **false** then on focus out, the label color, the border color of textarea should be _#EA2A2A_ and show feedback, as followed - _"Message should be at least 20 characters long!"_.
  - if **true** then on focus out the border color of input should be _Neutrals/400_.

### Enable the button if all the inputs are valid and passes all validations. Only then the form is valid to be submitted.

### Consent

I hereby consent to Elegant Tek LLC collecting, processing, and
storing my personal data for the purpose of considering me for
employment, including conducting background checks, arranging
travel, and contacting references. The personal data provided in
this application will be retained by Elegant Tek LLC for a period
of one year from the date of this application, after which it will
be deleted from our systems unless you are hired. You have the
right to access, correct, modify, update, rectify, request for
the transfer or deletion of data, withdrawal of consent, or
objection to processing of data by sending an email to
