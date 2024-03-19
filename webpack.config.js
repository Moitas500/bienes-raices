import path from 'path'

export default {
    mode: 'development',
    entry: {
        map: './src/js/mapa.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}