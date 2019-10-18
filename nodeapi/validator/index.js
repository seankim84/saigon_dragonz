exports.createPostValidator = (req, res, next) => {
    /* Route에서 middleware 로 사용 */
    // check(element, explain).option
    /* title */
    req.check('title', "Write a little").notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });

    /* body */
    req.check('body', "Write a Body").notEmpty();
    req.check('body', 'Body must be between 4 to 150 characters').isLength({
        min: 1,
        max: 3000
    });

    /* Check for errros */
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]; // 첫번째 error 메세지만 출력
        return res.status(400).json({ error: firstError })
    }
    // proceed to next middleware
    next();
}

exports.userSignupValidator = (req, res, next) => {
    req.check('name', '실명을 작성해주세요').notEmpty();
    req.check('email', '이메일을 작성해주세요').notEmpty();
    req.check('email', '정확한 이메일을 적어주세요')
    .matches(/.+\@.+\..+/)
    .withMessage("이메일은 @가 있어야 합니다!")
    .isLength({
        min: 4,
        max: 300
    })

    req.check('password', '패스워드를 입력해주세요').notEmpty();
    req.check('password')
    .isLength({ min: 6 })
    .withMessage('패스워드 길이는 6자 이상이어야 합니다')
    .matches(/\d/)
    .withMessage('패스워드는 문자와 숫자를 포함해야합니다')

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
} 