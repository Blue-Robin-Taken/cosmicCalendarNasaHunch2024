'use server'; // DO NOT REMOVE, it resolves to client (because there is a function from here that's ran in a client func). All endpoints here MUST be secured.
import { db } from '@/app/database';

export default async function serverSignup(formData: FormData): Promise<{
    formLengthInvalid: boolean;
    userExists: boolean;
}> {
    const returnData: {
        formLengthInvalid: boolean;
        userExists: boolean;
    } = {
        formLengthInvalid: false,
        userExists: false,
    };
    const rawFormData: {
        username: FormDataEntryValue | null;
        password: FormDataEntryValue | null;
    } = {
        username: formData.get('username'),
        password: formData.get('password'),
    };

    if (rawFormData.username == null) {
        rawFormData.username = '';
    }
    if (rawFormData.password == null) {
        rawFormData.password = '';
    }

    if (rawFormData.password.toString().length < 6) {
        // Length of password set is too little
        returnData.formLengthInvalid = true;
        return returnData;
    }

    db.get(
        'SELECT username FROM users WHERE username IS ?',
        rawFormData.username,
        (err, row) => {
            console.log(err, row);
            if (row == undefined) {
                db.run(
                    'INSERT INTO users (username, password, email) VALUES(?, ?, ?)',
                    [rawFormData.username, rawFormData.password, null]
                );
            } else {
                returnData.userExists = true;
            }
        }
    );

    console.log(rawFormData);
    return returnData;
}
