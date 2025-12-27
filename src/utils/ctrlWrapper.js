// якщо помилка в контроллері, щоб її піймати і обробити ми обгортаємо контроллер
// якщо Експресс 5 версії то вже не потрібно робити цей враппер ctrlWrapper


export function ctrlWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next); 
    } catch (error) {
      next(error);
    }
  };
}
