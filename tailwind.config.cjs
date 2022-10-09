module.exports = {
    content: ["./index.html",
        "./src/**/*.{js,vue,html}", './node_modules/tw-elements/dist/js/**/*.js'],
    plugins: [
        require('tw-elements/dist/plugin')
    ]
}