import { TestBed } from '@angular/core/testing';
import { TagService } from './tag.service';
import { Tag } from '../models/tag';
import { HashUtil } from '../utils/hash-util';



describe('TagService', () => {

  let tagService: TagService;
  let tagA: Tag;
  let tagDupblicateA: Tag;
  
  beforeEach(() => {

    tagService = new TagService();

    tagA = new Tag();
    tagA.name = "a";
    tagA.id = HashUtil.getUniqueHash(null);

    tagDupblicateA = new Tag();
    tagDupblicateA.id = tagA.id;
    tagDupblicateA.name = tagA.name;

  });

  it('should save and get Tag', () => {
    tagService.addTag(tagA);
    expect(tagService.getTags().length).toBe(1);
  });

  it('should not add a duplicate tag with same name', () => {
    tagService.addTag(tagA);
    tagService.addTag(tagDupblicateA);
    expect(tagService.getTags().length).toBe(1);
  });

});