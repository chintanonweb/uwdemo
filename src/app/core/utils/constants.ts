export const DATE_FORMAT = {
  MMDDYYYY: 'MM/dd/yyyy'
};

export const RegExpressions = {
  TEN_DIGIT_NUMBER: new RegExp('^\\d{10}$'),
  FIRST_NAME_WITH_SINGLE_QUOTE: new RegExp("^[a-zA-Z][a-zA-Z0-9 \.''-]{0,30}$"),
  LAST_NAME_WITH_SINGLE_QUOTE: new RegExp("^[a-zA-Z][a-zA-Z0-9 \.''-]{1,30}$"),
  MIDDLE_NAME_WITH_SINGLE_QUOTE: new RegExp("^[a-zA-Z][a-zA-Z0-9 \.''-]{0,30}$"),
  NAME_WITH_SINGLE_QUOTE: new RegExp("^[a-zA-Z][a-zA-Z0-9 \.''_]{1,30}$"),
  SSN_VALIDATION_ALL: new RegExp('^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\\1(?!0000)[0-9]{4}$'),
  //NAME_WITH_ALL_CHARS: new RegExp("(?=^.{2,}$)(?=.*\d)(?=.*[a-zA-Z])(?!.*\s)[0-9a-zA-Z*$-+?_&=!%{}/'.]*$"),
  SSN_VALID: new RegExp('/^(\d{3})([ \-]?)(\d{2})([ \-]?)(\d{4})$/'),
  //https://www.codeproject.com/Articles/651609/Validating-Social-Security-Numbers-through-Regular
  SSN_WITH_DASHES: new RegExp(
    '^(?!219-09-9999|078-05-1120)(?!666|000|9d{2})d{3}-(?!00)d{2}-(?!0{4})d{4}$'
  ),
  SSN_WITHOUT_DASHES: new RegExp(
    '^(?!219099999|078051120)(?!666|000|9d{2})d{3}(?!00)d{2}(?!0{4})d{4}$'
  ),
  SSN_COMBINED: new RegExp('^((?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|((?!219 09 9999|078 05 1120)(?!666|000|9\d{2})\d{3} (?!00)\d{2} (?!0{4})\d{4})|((?!219099999|078051120)(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4})$'),
  SSN_JUST_FORMAT: new RegExp('^d{3}-d{2}-d{4}$'),
  SSN_JUST_FORMAT_WITHOUT_DASHES: new RegExp('^d{9}$'),
  DOB_DATE_FORMAT: new RegExp('/^\d{2}\/\d{2}\/\d{4}$/'),
  
  INDIV_NUMBER: new RegExp('^[0-9]{9,10}$')
 
};
