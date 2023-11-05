import { FakeRouter } from "./fakes/FakeRouter";


FakeRouter.get('/:id/pokemon', (req, res) => {
  const id = req.params.id;
})