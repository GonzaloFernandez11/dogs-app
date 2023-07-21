export default     function validate(input) {  
    let regexp = /^[a-zA-Z,. ]+$/;
    let regexpImg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    let errors = {};

    // Validamos el name:
    if( input.name === '' ) errors.name = `The "name" field can't be empty`;
    else if ( !regexp.test(input.name) ) errors.name = 'The name must contain only letters';

    // Validamos que la imagen sea una URL:
    if( input.image && !regexpImg.test(input.image) ) {
        errors.image = `The URL must be valid`;
    }
    //Validamos los height:
    if( input.min_height === '' ) errors.min_height = `The "min_height" field can't be empty`;
    else if( input.min_height < 15 ) errors.min_height = `It must measure 15cm or more!`;

    if( input.max_height === '' ) errors.max_height = `The "max_height" field can't be empty`;
    else if( input.max_height > 110 ) errors.max_height = `It must measure 110cm or less!`;

    if( parseInt(input.min_height) > parseInt(input.max_height) )
    errors.min_height = 'The minimum height cannot exceed the maximum';

    // Validamos los weight:
    if( input.min_weight === '' ) errors.min_weight = `The "min_weight" field can't be empty`;
    else if( parseInt(input.min_weight) < 1 ) errors.min_weight = 'It must weigh 1KG or more';

    if( input.max_weight === '' ) errors.max_weight = `The "max_weight" field can't be empty`;
    else if( parseInt(input.max_weight) > 93 ) errors.max_weight = 'It must weigh 93KG or less';

    if( parseInt(input.min_weight) > parseInt(input.max_weight) )
    errors.min_weight = `The minimum weight cannot exceed the maximum`;

    // Validamos los life span:
    if( input.min_life === '' ) errors.min_life = `The "min_life" field can't be empty`;
    else if( input.min_life < 1 ) errors.min_life = 'It must be greater then 1';

    if( input.max_life === '' ) errors.max_life = `The "max_life" field can't be empty`;
    else if( input.max_life === 20 ) errors.max_life = `It must be 20 years old or younger`;
    
    if( parseInt(input.min_life) > parseInt(input.max_life) )
    errors.min_life = `The minimumlife expectancy cannot exceed the maximum`;

    return errors;
}