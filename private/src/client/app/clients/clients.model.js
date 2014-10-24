/**
 * Created by syzer on 8/28/2014.
 */
angular.module('jsSparkUiApp').factory('clientsModel', function ($log, $q /*, clientsRepositoryService, _*/) {
    'use strict';

    return {

        // from DB
        get: function (item) {
            $log.info('looking for tags in db', item);
            return tagStorageService
                .getByName(item.name)
                .then(function (savedTags) {
                    $log.info('found tags', savedTags);
                    return savedTags;
                });
        },

        // unnecessary wraps with extra array, maybe flatten, or [0]
        getTagsByNames: function (names) {
            var that = this;
            var promisedTags = [];
            names.forEach(function (name) {
                var tag = {name: name};
                promisedTags.push(that.get(tag));   // aka item :)
            });
            return $q.all(promisedTags);
        },

        // savedTags.add(items) IN THIS ORDER!!
        saveOrUpdateList: function (items) {
            $log.info('looking for tag list', items);
            return tagStorageService
                .getByName([items.map(removeNamesBeforeSave)])      // add []
                .then(function (savedTags) {
                    items = _(savedTags)
                        .concat(items)
                        .uniq('name')
                        .value();
                    $log.info('saved tags', savedTags);
                    $log.info('merged article tags', items);
                    return tagStorageService.saveOrUpdateList(items);
                });
        },

        // items = articles
        buildTagCacheAndUpdate: function (items) {
            var tagCache = [];

            // load all tags to cache
            items.map(function (item) {
                item.tags.map(function (tag) {
                    tagCache.push(tag);
                });
            });

            // compact tag cache
            tagCache = _.unique(tagCache, 'name');

            return this.saveOrUpdateList(tagCache)
                // get the db for compacted/unique cache
                .then(function (savedTags) {
                    tagCache = savedTags;
                    return tagCache;
                })
                // substitute all tags for the ones that are in db, based on 'name'
                .then(function (tagCache) {
                    items.forEach(function (item) {
                        item.tags.map(function (tag) {
                            var match = _.find(tagCache, tag);
                            if (match) {        // had to
                                tag._id = match._id;
                            }
                            return tag;
                        });
                    });
                    return items;
                });
        },

        // proxy LocalStorage
        getActiveLocalWords: function () {
            return tagWordsLocalStorageService.getActiveWords();
        },

        // DB + localStorage
        getStartingWith: function (string) {
            return $q.all([
                tagWordsLocalStorageService.getStartingWith(string),
                tagStorageService.getStartingWith(string)
            ]).then(function (resp) {
                return _.flatten(resp);
            });
        }
    };

    function addNamesIfRequired(tag) {
        if (!tag.name) {
            return {name: tag};
        }
        return tag;
    }

    function removeNamesBeforeSave(tag) {
        if (tag.name) {
            return tag.name;
        }
        return tag;
    }
});

