const Ziggy = {
    url: 'http://localhost',
    port: null,
    defaults: {},
    routes: {
        'sanctum.csrf-cookie': {
            uri: 'sanctum/csrf-cookie',
            methods: ['GET', 'HEAD'],
        },
        'ignition.healthCheck': {
            uri: '_ignition/health-check',
            methods: ['GET', 'HEAD'],
        },
        'ignition.executeSolution': {
            uri: '_ignition/execute-solution',
            methods: ['POST'],
        },
        'ignition.updateConfig': {
            uri: '_ignition/update-config',
            methods: ['POST'],
        },
        'categories.index': { uri: 'categories', methods: ['GET', 'HEAD'] },
        'profile.edit': { uri: 'profile', methods: ['GET', 'HEAD'] },
        'profile.update': { uri: 'profile', methods: ['PATCH'] },
        'profile.destroy': { uri: 'profile', methods: ['DELETE'] },
        books: { uri: 'books', methods: ['GET', 'HEAD'] },
        'book.create': { uri: 'book/create', methods: ['GET', 'HEAD'] },
        'book.store': { uri: 'book', methods: ['POST'] },
        'export.books': { uri: 'export-books', methods: ['GET', 'HEAD'] },
        'book.show': {
            uri: 'book/{uuid}',
            methods: ['GET', 'HEAD'],
            parameters: ['uuid'],
        },
        'book.edit': {
            uri: 'book/{uuid}/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['uuid'],
        },
        'book.update': {
            uri: 'book/{uuid}',
            methods: ['PATCH'],
            parameters: ['uuid'],
        },
        'book.destroy': {
            uri: 'book/{uuid}',
            methods: ['DELETE'],
            parameters: ['uuid'],
        },
        register: { uri: 'register', methods: ['GET', 'HEAD'] },
        login: { uri: 'login', methods: ['GET', 'HEAD'] },
        'password.request': {
            uri: 'forgot-password',
            methods: ['GET', 'HEAD'],
        },
        'password.email': { uri: 'forgot-password', methods: ['POST'] },
        'password.reset': {
            uri: 'reset-password/{token}',
            methods: ['GET', 'HEAD'],
            parameters: ['token'],
        },
        'password.store': { uri: 'reset-password', methods: ['POST'] },
        'verification.notice': {
            uri: 'verify-email',
            methods: ['GET', 'HEAD'],
        },
        'verification.verify': {
            uri: 'verify-email/{id}/{hash}',
            methods: ['GET', 'HEAD'],
            parameters: ['id', 'hash'],
        },
        'verification.send': {
            uri: 'email/verification-notification',
            methods: ['POST'],
        },
        'password.confirm': {
            uri: 'confirm-password',
            methods: ['GET', 'HEAD'],
        },
        'password.update': { uri: 'password', methods: ['PUT'] },
        logout: { uri: 'logout', methods: ['POST'] },
    },
}

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes)
}

export { Ziggy }
