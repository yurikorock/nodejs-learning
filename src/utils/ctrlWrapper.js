// якщо помилка в контроллері, щоб її піймати і обробити ми обгортаємо контроллер


export function ctrlWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
