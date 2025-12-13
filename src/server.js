import app from './app.js';

const PORT = 8080;

function bootstrap() {
  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server started on port ${PORT}`);
  });
}
bootstrap();
