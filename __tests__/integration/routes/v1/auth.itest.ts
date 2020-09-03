import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { v1Path } from '../../utils'
const { expect: chaiExpect } = chai
chai.use(chaiHttp)

describe('Auth endpoints', () => {

  describe('Login', () => {
    
    const validLogin = {
    "email": "premium@stage.podverse.fm",
    "password": "Aa!1asdf"
    }

    const invalidLogin = {
      "email": "premium@stage.podverse.fm",
      "password": "Aa!1asdfs"
    }

    test('Invalid login', async (done) => {
      chai.request(global.app)
        .post(`${v1Path}/auth/login`)
        .send(invalidLogin)
        .end((err, res) => {
          chaiExpect(res).to.have.status(401)
          
          chaiExpect(res.body.message).to.equal('Invalid username or password')

          done()
        })
    })

    test('Valid login', async (done) => {
      chai.request(global.app)
        .post(`${v1Path}/auth/login`)
        .send(validLogin)
        .end((err, res) => {
          chaiExpect(res).to.have.status(200)

          chaiExpect(res.body.addByRSSPodcastFeedUrls).to.eql([
            "http://feed.thisamericanlife.org/talpodcast",
            "https://feeds.npr.org/344098539/podcast.xml",
            "https://feeds.npr.org/381444908/podcast.xml"
        ])
          chaiExpect(res.body.email).to.equal('premium@stage.podverse.fm')
          chaiExpect(res.body.emailVerified).to.equal(true)
          chaiExpect(res.body).to.have.property('freeTrialExpiration')
          chaiExpect(res.body).to.have.property('historyItems')
          chaiExpect(res.body.id).to.equal('QMReJmbE')
          chaiExpect(res.body).to.have.property('membershipExpiration')
          chaiExpect(res.body.name).to.equal('Premium Valid - Test User')

          const playlist0 = res.body.playlists[0]
          const playlist1 = res.body.playlists[1]

          chaiExpect(playlist0.id).to.equal('-67KgiG1')
          chaiExpect(playlist0).to.have.property('description')
          chaiExpect(playlist0.isPublic).to.equal(false)
          chaiExpect(playlist0.itemCount).to.equal(6)
          chaiExpect(playlist0.itemsOrder).to.eql([])
          chaiExpect(playlist0.title).to.equal('Premium - Test Playlist 1')
          chaiExpect(playlist0).to.have.property('createdAt')
          chaiExpect(playlist0).to.have.property('updatedAt')

          chaiExpect(playlist1.id).to.equal('CH_2-LlM')
          chaiExpect(playlist1).to.have.property('description')
          chaiExpect(playlist1.isPublic).to.equal(false)
          chaiExpect(playlist1.itemCount).to.equal(2)
          chaiExpect(playlist1.itemsOrder).to.eql([])
          chaiExpect(playlist1.title).to.equal('Premium - Test Playlist 2')
          chaiExpect(playlist1).to.have.property('createdAt')
          chaiExpect(playlist1).to.have.property('updatedAt')

          chaiExpect(res.body).to.have.property('queueItems')
          chaiExpect(res.body.subscribedPlaylistIds).to.eql([
            "zXSkVlr7",
            "wgOok7Xp"
          ])
          chaiExpect(res.body.subscribedPodcastIds).to.eql([
            "0RMk6UYGq",
            "XdbkHTiH9",
            "kS9ZnQNWlQc",
            "mN25xFjDG",
            "yKyjZDxsB",
            "zRo1jwx67",
            "Yqft_RG8j",
            "GZsvTjDH0",
            "Q_QCTJbNR"
          ])
          chaiExpect(res.body.subscribedUserIds).to.eql([
            "EVHDBRZY",
            "bvVjsQCH",
            "oAbPPRF9"
        ])
        
          done()
      })
    })
  })

  describe('Logout', () => {
    test('Logout', async (done) => {
      chai.request(global.app)
        .post(`${v1Path}/auth/logout`)
        .end((err, res) => {
          chaiExpect(res).to.have.status(200)

          done()
        })
    })
  })

})
