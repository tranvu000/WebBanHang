import BaseRepository from "./BaseRepository.js";
import Classify from "../Models/Classify.js"

class ClassifyRepository extends BaseRepository {
  constructor() {
    super(Classify)
  }
};

export default ClassifyRepository;