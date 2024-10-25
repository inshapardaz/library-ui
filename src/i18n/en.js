const en = {
    app: "Nawishta",
    slogan: "A comprehensive collection of urdu text and tools, presented brilliantly.",
    header: {
        home: "Home",
        libraries: "Libraries",
        libraryEditor: "Library Editor",
        fonts: "Fonts",
        dictionaries: "Dictionaries",
        tools: "Tools",
        writings: "Writings",
        books: "Books",
        authors: "Authors",
        categories: "Categories",
        series: "Series",
        periodicals: "Periodicals",
    },
    footer: {
        copyrights: "Copyrights Nawishta. All rights reserved.",
    },
    actions: {
        seeMore: "See More...",
        list: "List",
        card: "Cards",
        yes: "Yes",
        no: "No",
        close: "Close",
        retry: "Retry",
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        ok: "OK",
        resizeImage: "Resize Image",
        zoonIn: "Zoom In",
        zoonOut: "Zoom Out",
        next: "Next",
        previous: "Previous",
        done: "Done",
        viewAll: "View All"
    },
    login: {
        title: "Login",
        message: 'Welcome back!',
        registerMessage: 'Do not have an account yet?',
        email: {
            title: "Email",
            error: "Email is invalid",
            required: "Email is required",
        },
        password: {
            title: "Password",
            required: "Password is required",
        },
        error: "Unable to login. Please check your username and password.",
    },
    logout: {
        title: "Logout",
        confirmation: "Are you sure you want to log out?",
    },
    forgotPassword: {
        title: "Forgot Password",
        message: "Enter your email to get a reset link",
        submit: "Get Password",
        email: {
            title: "Email",
            error: "Email is invalid",
            required: "Email is required",
        },
        success: "Please check your email for password reset instructions.",
        error: "Unable to complete request. Please try again.",
    },
    register: {
        title: "Register",
        loginMessage: "Already registered with us?",
        submit: "Register",
        name: {
            label: "Name",
            required: "Name is required",
        },
        email: {
            label: "Email",
            error: "Email is invalid",
            required: "Email is required",
        },
        password: {
            label: "Password",
            required: "Password is required",
            length: "Password must be at least 6 characters.",
        },
        confirmPassword: {
            label: "Confirm Password",
            match: "Passwords must match",
            required: "Confirm Password is required",
        },
        success: "Registration successful, please login with your credentials.",
        error: "Unable to register. Please try again.",
        acceptTerms: {
            title: "Accept Terms & Conditions",
            requires: "Accepting Terms & Conditions is required.",
        },
        invitation: {
            expired:
                "Invitation link has expired. Please contact us to resend a new invitation code.",
            notFound: "Invitation link is not valid.",
        },
    },
    changePassword: {
        title: "Change Password",
        submit: "Change Password",
        oldPassword: {
            label: "Old Password",
            required: "Old Password is required",
        },
        password: {
            label: "New Password",
            required: "Password is required",
            length: "Password must be at least 6 characters.",
        },
        confirmPassword: {
            label: "Confirm Password",
            match: "Passwords must match",
            required: "Confirm Password is required",
        },
        success: "Password updated successfully",
        error: "Unable to change password. Please try again.",
    },
    resetPassword: {
        title: "Reset Password",
        submit: "Reset Password",
        password: {
            label: "Password",
            required: "Password is required",
            length: "Password must be at least 6 characters.",
        },
        confirmPassword: {
            label: "Confirm Password",
            match: "Passwords must match",
            required: "Confirm Password is required",
        },
        success: "Password updated successfully",
        error: "Unable to reset password. Please try again.",
        noCode: "No reset code is present. Please follow instructions in email sent to you.",
    },
    403: {
        title: "Unauthorised",
        description: "Sorry, you are not authorized to access this page.",
        action: "Back Home",
    },
    404: {
        title: "Not Found",
        description: "Sorry, the page you visited does not exist.",
        action: "Back Home",
    },
    500: {
        title: "Server Error",
        description: "Sorry, something went wrong.",
        action: "Back Home",
    },
    languages: {
        en: "English",
        ur: "Urdu",
    },
    copyrights: {
        Copyright: "Rights Reserved",
        PublicDomain: "Public Domain",
        Open: "Open",
        CreativeCommons: "Creative Commons",
        Unknown: "Unknown Copyrights",
    },
    profile: {
        title: "Profile",
    },
    search: {
        header: "Search",
        title: "Search...",
        placeholder: "Search by title, author, keyword",
    },
    libraries: {
        title: "Libraries",
        loadingError: "Unable to load libraries",
        search: {
            placeholder: "Search libraries...",
        },
        viewAll: "View All"
    },
    library: {
        noDescription: "No Description"
    },
    categories: {
        title: "Categories",
        all: "All Categories",
        errors: {
            loading: {
                title: "Error",
                subTitle: "Unable to load categories",
            },
        },
        empty: {
            title: "No Categories",
        },
    },
    books: {
        empty: "No books found."
    },
    book: {
        latestBooks: "Latest Additions",
        lastRead: "Recent Reads",
        favorites: "Favorites",
        noDescription: "No details...",
        series: {
            label: "Series",
            placeholder: "Select series",
            indexLabel: "Book of {{name}} series",
            seriesAndIndexLabel: "Book {{index}} of {{name}} series",
        },
        chapters: "Chapters",
        chapterCount_zero: "No chapter",
        chapterCount_one: "1 chapter",
        chapterCount_other: "{{count}} chapters",
        pageCount_one: "1 page",
        pageCount_other: "{{count}} pages",
        fileCount_one: "1 file",
        fileCount_other: "{{count}} files",
        publishLabel: "Published in {{year}}",
        isPublic: "Is Public"
    }
};

export default en;
