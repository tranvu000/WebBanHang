import BaseRepository from "./BaseRepository.js";
import ClassifyValue from "../Models/ClassifyValue.js";

class ClassifyValueRepository extends BaseRepository {
  constructor() {
    super(ClassifyValue)
  }
};

export default ClassifyValueRepository;